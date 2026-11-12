// ==========================================================
// LÓGICA DE JAVASCRIPT PARA LA AGENCIA DE VIAJES
// ==========================================================

// 1. Mostrar detalles en Modal de Bootstrap
function verDetalle(titulo, descripcion, precio) {
    document.getElementById('modalTitle').textContent = titulo;
    document.getElementById('modalDescription').textContent = descripcion;
    document.getElementById('modalPrice').textContent = `Precio por persona: ${precio} COP`;
    const myModal = new bootstrap.Modal(document.getElementById('modalDetalle'));
    myModal.show();
}

// 2. Filtrar Destinos por Categoría
function filtrarDestinos(categoria, boton) {
    // Actualizar estados visuales de los botones de filtro
    const botones = document.querySelectorAll('#destinos button.btn-outline-primary');
    botones.forEach(b => b.classList.remove('active'));
    boton.classList.add('active');

    // Ocultar / Mostrar tarjetas según la clase
    const tarjetas = document.querySelectorAll('.destino-card');
    tarjetas.forEach(tarjeta => {
        if (categoria === 'todos' || tarjeta.classList.contains(categoria)) {
            tarjeta.classList.remove('d-none');
        } else {
            tarjeta.classList.add('d-none');
        }
    });
}

// 3. Seleccionar paquete desde las tarjetas directamente al cotizador
function seleccionarPaquete(nombre, precio) {
    const select = document.getElementById('paqueteSelect');
    
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].getAttribute('data-nombre') === nombre) {
            select.selectedIndex = i;
            break;
        }
    }

    calcularReserva();
    
    // Desplazamiento suave hacia la sección del cotizador
    document.getElementById('reserva').scrollIntoView({ behavior: 'smooth' });
}

// 4. Calcular Cotización de Reserva Simulada en Tiempo Real
function calcularReserva() {
    const select = document.getElementById('paqueteSelect');
    const precioBase = parseFloat(select.value) || 0;
    const opcionSeleccionada = select.options[select.selectedIndex];
    const nombreDestino = opcionSeleccionada.getAttribute('data-nombre') || 'Ninguno seleccionado';

    const numPersonas = parseInt(document.getElementById('numPersonas').value) || 1;
    const numNoches = parseInt(document.getElementById('numNoches').value) || 0;

    const chkSeguro = document.getElementById('chkSeguro').checked ? 120000 : 0;
    const chkGuia = document.getElementById('chkGuia').checked ? 250000 : 0;

    // Cálculo: (Precio base + Seguro médico) * Personas + Noches * 150000 + Guía privado
    let total = 0;
    if (precioBase > 0) {
        total = (precioBase + chkSeguro) * numPersonas + (numNoches * 150000) + chkGuia;
    }

    // Actualizar el DOM con el resumen
    document.getElementById('resumenDestino').textContent = nombreDestino;
    document.getElementById('resumenPersonas').textContent = numPersonas;
    document.getElementById('resumenTotal').textContent = `$${total.toLocaleString('es-CO')} COP`;
}

// 5. Confirmación de Reserva Simulada
function confirmarReservaSimulada() {
    const select = document.getElementById('paqueteSelect');
    const precioBase = parseFloat(select.value) || 0;
    const alertBox = document.getElementById('reservaAlert');

    if (precioBase === 0) {
        alertBox.className = 'alert alert-warning mt-3';
        alertBox.textContent = 'Por favor selecciona un destino de la lista para cotizar tu reserva.';
        alertBox.classList.remove('d-none');
        return;
    }

    const totalText = document.getElementById('resumenTotal').textContent;
    const destinoText = document.getElementById('resumenDestino').textContent;

    alertBox.className = 'alert alert-success mt-3';
    alertBox.innerHTML = `<b>¡Reserva simulada confirmada!</b> Se ha generado una cotización de pre-reserva para <b>${destinoText}</b> por un valor total estimado de <b>${totalText}</b>. No se ha realizado ningún cobro real.`;
    alertBox.classList.remove('d-none');

    setTimeout(() => {
        alertBox.classList.add('d-none');
    }, 6000);
}

// 6. Validación interactiva de Formulario de Contacto
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formAlert = document.getElementById('form-alert');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
        } else {
            formAlert.classList.remove('d-none');
            form.reset();
            form.classList.remove('was-validated');
            setTimeout(() => formAlert.classList.add('d-none'), 4000);
        }
    });
});