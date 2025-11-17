const searchInput = document.getElementById('searchInput');
const filterStatus = document.getElementById('filterStatus');
const applyFilterBtn = document.getElementById('applyFilter');
const clearBtn = document.getElementById('clearFilter');

const container = document.getElementById('reportList');
const emptyState = document.getElementById('emptyState');
const totalCount = document.getElementById('totalCount');
let reports = JSON.parse(localStorage.getItem('reports')) || [];

function loadReports(reportsToRender = reports) {
  renderReports(reportsToRender);
  updateTotalCount(reportsToRender.length);
}

function updateTotalCount(count) {
  totalCount.textContent = `${count} Laporan`;
}

function renderReports(reportsToRender) {
  container.innerHTML = '';
  
  if (reportsToRender.length === 0) {
    container.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  container.style.display = 'flex';
  emptyState.style.display = 'none';

  reportsToRender.forEach(r => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="report-card p-3 h-100">
        ${r.image ? `
          <div class="mb-3">
            <img src="${r.image}" class="card-img-top rounded" alt="Foto Fasilitas" style="height: 180px; object-fit: cover; width: 100%;">
          </div>
        ` : ''}
        <div class="card-body d-flex flex-column p-0">
          <h5 class="card-title fw-bold mb-2">${r.name}</h5>
          <p class="card-text text-muted mb-3 flex-grow-1">${r.description}</p>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="status-badge ${getStatusClass(r.status)}">
              <i class="fas ${getStatusIcon(r.status)} me-1"></i>${r.status}
            </span>
            <small class="text-muted">${r.date}</small>
          </div>
          <div class="d-flex gap-2">
            <a href="report-detail.html?id=${r.id}" class="btn btn-outline-primary btn-sm flex-fill">
              <i class="fas fa-eye me-1"></i>Detail
            </a>
            <button class="btn btn-outline-danger btn-sm" onclick="deleteReport(${r.id})">
              <i class="fas fa-trash me-1"></i>Hapus
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function getStatusClass(status) {
  const classes = {
    'Baru': 'bg-danger text-white',
    'Diproses': 'bg-warning text-dark',
    'Selesai': 'bg-success text-white'
  };
  return classes[status] || 'bg-secondary text-white';
}

function getStatusIcon(status) {
  const icons = {
    'Baru': 'fa-clock',
    'Diproses': 'fa-spinner',
    'Selesai': 'fa-check-circle'
  };
  return icons[status] || 'fa-file';
}

function applyFilter() {
  const searchValue = searchInput.value.toLowerCase();
  const filterValue = filterStatus.value;

  const filtered = reports.filter(r =>
    (r.name.toLowerCase().includes(searchValue)) &&
    (filterValue === "" || r.status === filterValue)
  );

  document.getElementById("filterStatusInfo").innerText =
    filtered.length === 0 ? "Tidak ada laporan yang sesuai dengan filter" : `Menampilkan ${filtered.length} dari ${reports.length} laporan`;

  renderReports(filtered);
  updateTotalCount(filtered.length);
}

function clearFilter() {
  searchInput.value = '';
  filterStatus.value = '';
  document.getElementById("filterStatusInfo").innerText = '';
  renderReports(reports);
  updateTotalCount(reports.length);
}

function deleteReport(id) {
  if (!confirm("Yakin ingin menghapus laporan ini?")) return;

  reports = reports.filter(report => report.id !== id);
  localStorage.setItem('reports', JSON.stringify(reports));

  alert("Laporan berhasil dihapus!");
  renderReports(reports);
  updateTotalCount(reports.length);
}

// Event listeners
applyFilterBtn.addEventListener("click", applyFilter);
clearBtn.addEventListener('click', clearFilter);
searchInput.addEventListener('input', applyFilter);
filterStatus.addEventListener('change', applyFilter);

// Initial load
loadReports();