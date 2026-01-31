document.addEventListener("DOMContentLoaded", async () => {
    // 1. CARGA DINÁMICA DE COMPONENTES (Header/Footer)
    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
        const file = el.getAttribute('data-include');
        try {
            const res = await fetch(file);
            if (res.ok) {
                el.outerHTML = await res.text();
                // Si acabamos de cargar el header, activamos los links
                if (file.includes('header')) markActiveLink();
            }
        } catch (err) {
            console.error("Error cargando:", file, err);
        }
    }

    // 2. ANIMACIÓN REVEAL AL HACER SCROLL
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('in');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
});

// Función para marcar el link activo según la URL
function markActiveLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(link => {
        const href = link.getAttribute("href").split("/").pop();
        if (href === currentPath || (currentPath === "" && href === "index.html")) {
            link.classList.add("active");
        }
    });
}
// Limpiar .html e index.html de la barra de direcciones
if (window.location.pathname.endsWith('/index.html')) {
    window.history.replaceState(null, '', window.location.pathname.replace('/index.html', '/'));
} else if (window.location.pathname.endsWith('.html')) {
    window.history.replaceState(null, '', window.location.pathname.replace('.html', ''));
}