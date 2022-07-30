const config = {
  default: {
    DATABASE: process.env.MONGODB_TEST || "mongodb://localhost:27017/EmployeesData",
    PORT: 8081,
  },
};