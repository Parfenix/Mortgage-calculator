import updateModel from "./../utils/updateModel.js";

function init(getData) {
    const input = document.querySelector('#input-downpayment ');

    const settings = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' ',
    }; 

    const cleveInput = new Cleave(input, settings);
    cleveInput.setRawValue(getData().payment);

    input.addEventListener('input', function() {
        const value = +cleveInput.getRawValue();

        // Checking the minimum and maximum first payment  
        if (value < getData().getMinPayment() || value > getData().getMaxPayment()) {
            input.closest('.param__details').classList.add('param__details--error');
        }

        if (value >= getData().getMinPayment()  &&  value <= getData().getMaxPayment() ) {
            input.closest('.param__details').classList.remove('param__details--error');
        }

        updateModel(input, {
            payment : value,
            onUpdate: 'inputPayment', 
        })
    }) 

    input.addEventListener('change', function() {
        let value = +cleveInput.getRawValue();

        if (value > getData().getMaxPayment()) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleveInput.setRawValue(getData().getMaxPayment() );
        }

        if (value < getData().getMinPayment()) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleveInput.setRawValue(getData().getMinPayment());
        }

        value = +cleveInput.getRawValue();

        updateModel(input, {
            payment: value,
            onUpdate: 'inputPayment', 
        })
    })

    return cleveInput; 
}  

export default init;