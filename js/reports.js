const searchInput = document.getElementById('searchInput');
const filterStatus = document.getElementById('filterStatus');
const applyFilterBtn = document.getElementById('applyFilter');
const clearBtn = document.getElementById('clearFilter');

const container = document.getElementById('reportList');
let reports = JSON.parse(localStorage.getItem('reports')) || [];

function loadReports(reportsToRender = reports) {
  renderReports(reportsToRender);
}

function renderReports(reportsToRender) {
  container.innerHTML = '';
  
  if (reportsToRender.length === 0) {
    container.innerHTML = '<p class="text-muted">Belum ada laporan.</p>';
    return;
  }

  reportsToRender.forEach(r => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card shadow-sm h-100">
        ${r.image ? `<img src="${r.image}" class="card-img-top" alt="Foto Fasilitas" style="height: 200px; object-fit: cover;">` : ''}
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${r.name}</h5>
          <p class="card-text flex-grow-1">${r.description}</p>
          <span class="badge bg-${r.status === 'Selesai' ? 'success' : r.status === 'Diproses' ? 'warning' : 'secondary'} mb-2">
            ${r.status}
          </span>
          <div class="mt-auto d-flex justify-content-between">
            <a href="report-detail.html?id=${r.id}" class="btn btn-sm btn-primary">Detail</a>
            <button class="btn btn-sm btn-danger" onclick="deleteReport(${r.id})">Hapus</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function applyFilter() {
  const searchValue = searchInput.value.toLowerCase();
  const filterValue = filterStatus.value;

  const filtered = reports.filter(r =>
    (r.name.toLowerCase().includes(searchValue)) &&
    (filterValue === "" || r.status === filterValue)
  );

  document.getElementById("filterStatusInfo").innerText =
    `Filter diterapkan: ${filtered.length} laporan ditemukan`;

  renderReports(filtered);
}

function clearFilter() {
  searchInput.value = '';
  filterStatus.value = '';
  document.getElementById("filterStatusInfo").innerText = '';
  renderReports(reports);
}

function deleteReport(id) {
  if (!confirm("Yakin ingin menghapus laporan ini?")) return;

  reports = reports.filter(report => report.id !== id);
  localStorage.setItem('reports', JSON.stringify(reports));

  alert("Laporan berhasil dihapus!");
  renderReports(reports);
}

// Event listeners
applyFilterBtn.addEventListener("click", applyFilter);
clearBtn.addEventListener('click', clearFilter);

// Initial load
loadReports();