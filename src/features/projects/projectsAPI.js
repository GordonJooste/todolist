// A mock function to mimic making an async request for data

// TODO needs to be made to work with projects information
export function fetchProject(title = 1) {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: amount }), 500)
    );
  }