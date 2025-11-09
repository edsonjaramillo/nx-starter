#!/usr/bin/env bash

set -euo pipefail

# Configuration - no defaults, all required
readonly API_PORT="${API_PORT:?API_PORT environment variable must be set}"
readonly API_HEALTH_ENDPOINT="http://localhost:${API_PORT}/doc"
readonly CURL_TIMEOUT=30
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly OUTPUT_FILE="./dist/openapi-api-schema.d.ts"

# Track if we started the API
API_PID=""
API_STARTED_BY_SCRIPT=false

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly NC='\033[0m' # No Color

log_error() {
	echo -e "${RED}Error: $*${NC}" >&2
}

log_success() {
	echo -e "${GREEN}$*${NC}"
}

log_info() {
	echo -e "${YELLOW}$*${NC}"
}

# Validate we're in the correct directory
validate_directory() {
	if [[ "$(basename "$(pwd)")" != "open-api" ]]; then
		log_error "Script must be run from the 'open-api' directory"
		exit 1
	fi
}

# Get PID of process using port
get_port_pid() {
	local port=$1
	if command -v lsof >/dev/null 2>&1; then
		lsof -t -i :"$port" 2>/dev/null || true
	else
		log_error "lsof is required to manage API process"
		return 1
	fi
}

# Check if port is in use
is_port_in_use() {
	local port=$1
	local pid
	pid=$(get_port_pid "$port")
	[[ -n "$pid" ]]
}

# Wait for API to be ready using curl's built-in retry
wait_for_api() {
	log_info "Waiting for API to be ready..."

	if curl --silent --fail \
		--max-time "$CURL_TIMEOUT" \
		--retry 30 \
		--retry-delay 1 \
		--retry-connrefused \
		"$API_HEALTH_ENDPOINT" >/dev/null; then
		log_success "API is ready!"
		return 0
	else
		log_error "API did not become ready within ${CURL_TIMEOUT} seconds"
		return 1
	fi
}

# Start API if not running
start_api_if_needed() {
	if is_port_in_use "$API_PORT"; then
		log_info "Process already running on port ${API_PORT}, will leave running after script completes"
		return 0
	fi

	log_info "No process on port ${API_PORT}, starting API..."

	cd ../../apps/api || {
		log_error "Could not change to apps/api directory"
		exit 1
	}

	pnpm dev &

	cd "$SCRIPT_DIR" || exit 1

	if ! wait_for_api; then
		log_error "Failed to start API"
		exit 1
	fi

	# Get the actual PID of the process listening on the port
	API_PID=$(get_port_pid "$API_PORT")

	if [[ -z "$API_PID" ]]; then
		log_error "Could not determine API process ID"
		exit 1
	fi

	API_STARTED_BY_SCRIPT=true
	log_info "API started successfully (PID: ${API_PID}), will be stopped after script completes"
}

# Generate OpenAPI types
generate_types() {
	log_info "Generating OpenAPI types..."

	if ! pnpm exec openapi-typescript "$API_HEALTH_ENDPOINT" -o "$OUTPUT_FILE"; then
		log_error "Failed to generate OpenAPI types"
		exit 1
	fi

	log_success "Types generated successfully at ${OUTPUT_FILE}"

	if [[ "$API_STARTED_BY_SCRIPT" == true ]] && [[ -n "$API_PID" ]]; then
		log_info "Stopping API process ${API_PID} (started by script)..."
		kill "$API_PID" 2>/dev/null || true
		log_success "API server stopped"
	fi
}

# Main execution
main() {
	validate_directory
	start_api_if_needed
	generate_types
}

main "$@"
