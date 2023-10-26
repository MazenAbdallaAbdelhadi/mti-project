class ApiResponse {
  constructor(message, data, status) {
    this.message = message;
    this.data = data;
    this.status = status;
  }
}

module.exports = ApiResponse;
