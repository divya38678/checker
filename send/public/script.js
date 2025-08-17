// Application State
let currentView = "dashboard"
let selectedDocument = null
let selectedWorkItem = null

// Sample Data
const workItems = [
  {
    id: "WI001",
    submittedBy: "John Doe",
    submissionDate: "2024-01-15",
    status: "Pending Review",
    customerName: "Alice Johnson",
    loanType: "Personal Loan",
    loanAmount: "$25,000",
    documents: [
      { name: "Photograph", status: "VALID" },
      { name: "Aadhaar Card", status: "VALID" },
      { name: "PAN Card", status: "VALID" },
      { name: "Salary Proof", status: "REVIEW" },
    ],
    personalDetails: {
      firstName: "Alice",
      middleName: "M",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phone: "123-456-7890",
      aadhaar: "XXXX XXXX XXXX",
      pan: "ABCDE1234F",
    },
    employmentDetails: {
      employer: "ABC Corp",
      annualIncome: "75000",
      workExperience: "5",
    },
    notes: "Blurry, but readable. Maker's note: Need to verify against bank statement data.",
  },
  {
    id: "WI002",
    submittedBy: "Jane Smith",
    submissionDate: "2024-01-16",
    status: "Pending Review",
    customerName: "Bob Wilson",
    loanType: "Home Loan",
    loanAmount: "$150,000",
    documents: [
      { name: "Photograph", status: "VALID" },
      { name: "Aadhaar Card", status: "VALID" },
      { name: "PAN Card", status: "REVIEW" },
      { name: "Income Certificate", status: "VALID" },
    ],
    personalDetails: {
      firstName: "Bob",
      middleName: "R",
      lastName: "Wilson",
      email: "bob.wilson@example.com",
      phone: "987-654-3210",
      aadhaar: "YYYY YYYY YYYY",
      pan: "FGHIJ5678K",
    },
    employmentDetails: {
      employer: "XYZ Ltd",
      annualIncome: "120000",
      workExperience: "8",
    },
    notes: "All documents clear and readable.",
  },
]

const finishedTasks = []

// DOM Elements
const app = document.getElementById("app")

// Navigation Functions
function navigateTo(view, workItemId = null) {
  currentView = view
  if (workItemId) {
    selectedWorkItem = workItems.find((item) => item.id === workItemId)
  }
  render()
}

// Render Functions
function render() {
  switch (currentView) {
    case "dashboard":
      renderDashboard()
      break
    case "workQueue":
      renderWorkQueue()
      break
    case "workItemDetails":
      renderWorkItemDetails()
      break
    case "finishedTasks":
      renderFinishedTasks()
      break
    default:
      renderDashboard()
  }
}

function renderHeader() {
  return `
        <header class="header">
            <nav class="nav">
                <div class="nav-left">
                    <div class="logo"></div>
                    <div class="nav-links">
                        <a href="#" class="nav-link ${currentView === "dashboard" ? "active" : ""}" onclick="navigateTo('dashboard')">DASHBOARD</a>
                        <a href="#" class="nav-link ${currentView === "workQueue" ? "active" : ""}" onclick="navigateTo('workQueue')">WORK QUEUE</a>
                        <a href="#" class="nav-link" onclick="alert('Help section coming soon!')">HELP</a>
                        <a href="#" class="nav-link" onclick="alert('No new notifications')">NOTIFICATIONS</a>
                        <a href="#" class="nav-link ${currentView === "finishedTasks" ? "active" : ""}" onclick="navigateTo('finishedTasks')">FINISHED TASKS</a>
                    </div>
                </div>
                <div class="user-icon"></div>
            </nav>
        </header>
    `
}

function renderDashboard() {
  app.innerHTML = `
        ${renderHeader()}
        <main class="main-content fade-in">
            <h1 class="page-title">Operations Dashboard</h1>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">${workItems.length}</div>
                    <div class="stat-label">Pending Tasks</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${finishedTasks.length}</div>
                    <div class="stat-label">Completed Today</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">95%</div>
                    <div class="stat-label">Accuracy Rate</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">2.5h</div>
                    <div class="stat-label">Avg Processing Time</div>
                </div>
            </div>
        </main>
    `
}

function renderWorkQueue() {
  app.innerHTML = `
        ${renderHeader()}
        <main class="main-content fade-in">
            <h1 class="page-title">ASSIGNED TASKS</h1>
            
            <div class="filter-section">
                <div class="filter-title">FILTER BY:</div>
                <div class="filter-inputs">
                    <input type="text" class="filter-input" placeholder="Work ID" id="filterWorkId">
                    <input type="text" class="filter-input" placeholder="Name" id="filterName">
                    <input type="date" class="filter-input" id="filterDate">
                </div>
            </div>

            <div class="tasks-table">
                <div class="table-header">
                    <div>WORK ID</div>
                    <div>SUBMITTED BY</div>
                    <div>SUBMISSION DATE</div>
                    <div>STATUS</div>
                    <div>ACTION</div>
                </div>
                ${workItems
                  .map(
                    (item) => `
                    <div class="table-row">
                        <div>${item.id}</div>
                        <div>${item.submittedBy}</div>
                        <div>${item.submissionDate}</div>
                        <div><span class="status-badge status-pending">${item.status}</span></div>
                        <div><button class="btn btn-primary" onclick="navigateTo('workItemDetails', '${item.id}')">VIEW</button></div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </main>
    `

  // Add filter functionality
  setupFilters()
}

function renderWorkItemDetails() {
  if (!selectedWorkItem) {
    navigateTo("workQueue")
    return
  }

  app.innerHTML = `
        ${renderHeader()}
        <main class="main-content fade-in">
            <h1 class="page-title">WORK ITEMS DETAILS</h1>
            
            <div class="details-container">
                <div class="details-panel">
                    <h3 class="panel-title">Uploaded Documents</h3>
                    <ul class="document-list">
                        ${selectedWorkItem.documents
                          .map(
                            (doc, index) => `
                            <li class="document-item ${selectedDocument === index ? "active" : ""}" onclick="selectDocument(${index})">
                                <span>${doc.name}</span>
                                <span class="status-badge ${doc.status === "VALID" ? "status-review" : "status-pending"}">${doc.status}</span>
                            </li>
                        `,
                          )
                          .join("")}
                    </ul>
                </div>

                <div class="document-viewer">
                    ${
                      selectedDocument !== null
                        ? `
                        <div class="viewer-placeholder">📄</div>
                        <h3>${selectedWorkItem.documents[selectedDocument].name}</h3>
                        <p>Document viewer would display the selected document here.</p>
                    `
                        : `
                        <div class="viewer-placeholder">👁️</div>
                        <p>Select a document from the list to view it here.</p>
                    `
                    }
                </div>

                <div class="details-panel">
                    <h3 class="panel-title">Personal Details</h3>
                    <div class="detail-item">
                        <span class="detail-label">First Name:</span>
                        <span class="detail-value">${selectedWorkItem.personalDetails.firstName} <span class="verified-icon">✓</span></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Middle Name:</span>
                        <span class="detail-value">${selectedWorkItem.personalDetails.middleName} <span class="verified-icon">✓</span></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Last Name:</span>
                        <span class="detail-value">${selectedWorkItem.personalDetails.lastName} <span class="verified-icon">✓</span></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${selectedWorkItem.personalDetails.email} <span class="verified-icon">✓</span></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Phone:</span>
                        <span class="detail-value">${selectedWorkItem.personalDetails.phone} <span class="verified-icon">✓</span></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Aadhaar:</span>
                        <span class="detail-value">${selectedWorkItem.personalDetails.aadhaar} <span class="verified-icon">✓</span></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">PAN:</span>
                        <span class="detail-value">${selectedWorkItem.personalDetails.pan} <span class="verified-icon">✓</span></span>
                    </div>

                    <h3 class="panel-title" style="margin-top: 2rem;">Employment Details</h3>
                    <div class="detail-item">
                        <span class="detail-label">Employer:</span>
                        <span class="detail-value">${selectedWorkItem.employmentDetails.employer} <span class="verified-icon">✓</span></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Annual Income:</span>
                        <span class="detail-value">$${selectedWorkItem.employmentDetails.annualIncome} <span class="verified-icon">✓</span></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Experience:</span>
                        <span class="detail-value">${selectedWorkItem.employmentDetails.workExperience} years <span class="verified-icon">✓</span></span>
                    </div>
                </div>
            </div>

            <div class="action-buttons">
                <button class="btn btn-approve" onclick="approveWorkItem()">APPROVE</button>
                <button class="btn btn-reject" onclick="rejectWorkItem()">REJECT</button>
                <button class="btn btn-secondary" onclick="sendBackToMaker()">SEND BACK TO MAKER</button>
            </div>
        </main>
    `
}

function renderFinishedTasks() {
  app.innerHTML = `
        ${renderHeader()}
        <main class="main-content fade-in">
            <h1 class="page-title">FINISHED TASKS</h1>
            
            <div class="tasks-table">
                <div class="table-header">
                    <div>WORK ID</div>
                    <div>CUSTOMER NAME</div>
                    <div>COMPLETION DATE</div>
                    <div>STATUS</div>
                    <div>ACTION</div>
                </div>
                ${
                  finishedTasks.length === 0
                    ? `
                    <div class="table-row">
                        <div colspan="5" style="text-align: center; color: #666; grid-column: 1 / -1;">No finished tasks yet</div>
                    </div>
                `
                    : finishedTasks
                        .map(
                          (item) => `
                    <div class="table-row">
                        <div>${item.id}</div>
                        <div>${item.customerName}</div>
                        <div>${item.completionDate}</div>
                        <div><span class="status-badge status-review">${item.finalStatus}</span></div>
                        <div><button class="btn btn-primary" onclick="viewFinishedTask('${item.id}')">VIEW</button></div>
                    </div>
                `,
                        )
                        .join("")
                }
            </div>
        </main>
    `
}

// Utility Functions
function selectDocument(index) {
  selectedDocument = index
  renderWorkItemDetails()
}

function setupFilters() {
  const filterWorkId = document.getElementById("filterWorkId")
  const filterName = document.getElementById("filterName")
  const filterDate = document.getElementById("filterDate")
  ;[filterWorkId, filterName, filterDate].forEach((input) => {
    input.addEventListener("input", filterTasks)
  })
}

function filterTasks() {
  const workIdFilter = document.getElementById("filterWorkId").value.toLowerCase()
  const nameFilter = document.getElementById("filterName").value.toLowerCase()
  const dateFilter = document.getElementById("filterDate").value

  const rows = document.querySelectorAll(".table-row:not(.table-header)")

  rows.forEach((row) => {
    const workId = row.children[0].textContent.toLowerCase()
    const submittedBy = row.children[1].textContent.toLowerCase()
    const submissionDate = row.children[2].textContent

    const matchesWorkId = !workIdFilter || workId.includes(workIdFilter)
    const matchesName = !nameFilter || submittedBy.includes(nameFilter)
    const matchesDate = !dateFilter || submissionDate === dateFilter

    row.style.display = matchesWorkId && matchesName && matchesDate ? "grid" : "none"
  })
}

function approveWorkItem() {
  if (selectedWorkItem) {
    const finishedTask = {
      ...selectedWorkItem,
      completionDate: new Date().toISOString().split("T")[0],
      finalStatus: "APPROVED",
    }

    finishedTasks.push(finishedTask)

    // Remove from work items
    const index = workItems.findIndex((item) => item.id === selectedWorkItem.id)
    if (index > -1) {
      workItems.splice(index, 1)
    }

    alert("Work item approved successfully!")
    navigateTo("finishedTasks")
  }
}

function rejectWorkItem() {
  if (selectedWorkItem) {
    const finishedTask = {
      ...selectedWorkItem,
      completionDate: new Date().toISOString().split("T")[0],
      finalStatus: "REJECTED",
    }

    finishedTasks.push(finishedTask)

    // Remove from work items
    const index = workItems.findIndex((item) => item.id === selectedWorkItem.id)
    if (index > -1) {
      workItems.splice(index, 1)
    }

    alert("Work item rejected.")
    navigateTo("finishedTasks")
  }
}

function sendBackToMaker() {
  alert("Work item sent back to maker for revision.")
  navigateTo("workQueue")
}

function viewFinishedTask(taskId) {
  const task = finishedTasks.find((t) => t.id === taskId)
  if (task) {
    selectedWorkItem = task
    navigateTo("workItemDetails")
  }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  render()
})
