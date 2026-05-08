document.addEventListener("DOMContentLoaded", () => {
    const tabsEl = document.getElementById("tabs");
    const contentEl = document.getElementById("content");

    // The data is available in the global variable `cammyData` loaded from data.js
    if (typeof cammyData !== "undefined") {
        renderData(cammyData);
    } else {
        contentEl.innerHTML = "<p>Error: No se encontraron los datos estáticos.</p>";
    }

    function renderData(data) {
        const sheetNames = Object.keys(data);
        
        sheetNames.forEach((sheetName, index) => {
            // Create tab
            const tab = document.createElement("li");
            tab.textContent = sheetName;
            tab.dataset.target = "sheet-" + index;
            if (index === 0) tab.classList.add("active");
            
            tab.addEventListener("click", () => switchTab(tab, "sheet-" + index));
            tabsEl.appendChild(tab);

            // Create content section
            const section = document.createElement("div");
            section.id = "sheet-" + index;
            section.className = "sheet-content";
            if (index === 0) section.classList.add("active");

            const sheetData = data[sheetName];
            
            // Check if there is data
            if (sheetData.columns.length === 0 && sheetData.rows.length === 0) {
                section.innerHTML = "<p>No hay datos en esta hoja.</p>";
            } else {
                const table = document.createElement("table");
                
                // Create table header
                const thead = document.createElement("thead");
                const headerRow = document.createElement("tr");
                sheetData.columns.forEach(colName => {
                    const th = document.createElement("th");
                    th.textContent = colName;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // Create table body
                const tbody = document.createElement("tbody");
                sheetData.rows.forEach(row => {
                    // Skip completely empty rows
                    if (row.every(cell => cell === "")) return;
                    
                    const tr = document.createElement("tr");
                    row.forEach(cellValue => {
                        const td = document.createElement("td");
                        td.textContent = cellValue;
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);
                section.appendChild(table);
            }

            contentEl.appendChild(section);
        });
    }

    function switchTab(activeTab, targetId) {
        document.querySelectorAll(".tabs li").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".sheet-content").forEach(s => s.classList.remove("active"));
        
        activeTab.classList.add("active");
        document.getElementById(targetId).classList.add("active");
    }
});