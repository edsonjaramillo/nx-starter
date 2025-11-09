#!/usr/bin/env bash

set -euo pipefail

# Configuration - no defaults, all required
readonly API_PORT="${API_PORT:?API_PORT environment variable must be set}"
readonly API_OPENAPI_DOC_ENDPOINT="http://localhost:${API_PORT}/doc"
readonly CURL_TIMEOUT=30
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly OUTPUT_FILE="./dist/openapi-api-schema.d.ts"

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

# Wait for API to be ready using curl's built-in retry
wait_for_api() {
	log_info "Waiting for API to be ready..."

	if curl --silent --fail \
		--max-time "$CURL_TIMEOUT" \
		--retry 30 \
		--retry-delay 1 \
		--retry-connrefused \
		"$API_OPENAPI_DOC_ENDPOINT" >/dev/null; then
		log_success "API is ready!"
		return 0
	else
		log_error "API did not become ready within ${CURL_TIMEOUT} seconds"
		return 1
	fi
}

# Generate OpenAPI types
generate_types() {
	log_info "Generating OpenAPI types..."

	if ! pnpm exec openapi-typescript "$API_OPENAPI_DOC_ENDPOINT" -o "$OUTPUT_FILE"; then
		log_error "Failed to generate OpenAPI types"
		exit 1
	fi

	log_success "Types generated successfully at ${OUTPUT_FILE}"
}

# Main execution
main() {
	validate_directory
	generate_types
}

main "$@"
