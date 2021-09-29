export const steps = [
    {
        target: '[mensaje-tour="1"]',
        content:
            "<b>Cajón de navegación</b><br/> <small>Aqui estan los modulos <br/> con los que cuenta el sistema</small> ",
        params: {
            placement: "left",
        },
    },
    {
        target: '[mensaje-tour="2"]',
        content:
            "<b>En este modulo </b><br/><small> puedes configurar <br/> tu información personal</small>",
        params: {
            placement: "bottom",
        },
    },
    {
        target: '[mensaje-tour="3"]',
        content:
            "<b>Salir</b><br/><small> Al pulsar el boton, cierras tu sesión </small>",
        params: {
            placement: "top",
        },
    },
    {
        target: '[mensaje-tour="4"]',
        content:
            "<b>Boton de colapso</b><br/><small> Al pulsar el boton, <br/> el cajón de navegación <br/> se hace pequeño </small>",
        params: {
            placement: "left",
        },
    },
];

export const myOptions = {
    useKeyboardNavigation: true,
    labels: {
        buttonSkip: "Saltar recorrido",
        buttonPrevious: "Anterior",
        buttonNext: "Siguiente",
        buttonStop: "Finalizar",
    },
};
