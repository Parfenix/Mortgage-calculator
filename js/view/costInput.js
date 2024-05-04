function init(getData ) {
    const input = document.querySelector('#input-cost');

    const settings = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' ',
    };

    new Cleave(input, settings);
}

export default init;