import updateModel from "./../utils/updateModel.js";

function init(getData ) {
    const input = document.querySelector('#input-cost');
 
    const settings = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' ',
    }; 

    const cleveInput = new Cleave(input, settings);
    cleveInput.setRawValue(getData().cost);

    input.addEventListener('input', function() {
        const value = +cleveInput.getRawValue();

        // Checking the minimum and maximum price 
        if (value < getData().minPrice || value > getData().maxPrice) {
            input.closest('.param__details').classList.add('param__details--error');
        }

        if (value >= getData().minPrice &&  value <= getData().maxPrice) {
            input.closest('.param__details').classList.remove('param__details--error');
        }

        updateModel(input, {
            cost: value,
            onUpdate: 'inputCost', 
        })
    }) 

    input.addEventListener('change', function() {
        let value = +cleveInput.getRawValue();

        if (value > getData().maxPrice) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleveInput.setRawValue(getData().maxPrice);
        }

        if (value < getData().minPrice) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleveInput.setRawValue(getData().minPrice);
        }

        value = +cleveInput.getRawValue();

        updateModel(input, {
            cost: value,
            onUpdate: 'inputCost', 
        })
    })
} 

export default init;