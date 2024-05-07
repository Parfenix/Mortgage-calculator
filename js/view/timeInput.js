import updateModel from "./../utils/updateModel.js";

function init(getData) {
    const input = document.querySelector('#input-term');

    const settings = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' ',
    };  

    const cleveInput = new Cleave(input, settings);
    cleveInput.setRawValue(getData().time);

    input.addEventListener('input', function() {
        const value = +cleveInput.getRawValue();

        // Checking the minimum and maximum price 
        if (value < getData().minYear || value > getData().maxYear) {
            input.closest('.param__details').classList.add('param__details--error');
        }

        if (value >= getData().minYear &&  value <= getData().maxYear ) {
            input.closest('.param__details').classList.remove('param__details--error');
        }

        updateModel(input, {
            time: value,
            onUpdate: 'inputTime ', 
        })
    }) 

    input.addEventListener('change', function() {
        let value = +cleveInput.getRawValue();

        if (value > getData().maxYear) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleveInput.setRawValue(getData().maxYear);
        }

        if (value < getData().minYear) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleveInput.setRawValue(getData().minYear);
        }

        value = +cleveInput.getRawValue();

        updateModel(input, {
            time: value,
            onUpdate: 'inputTime', 
        })
    }) 

    return cleveInput; 
}

export default init;