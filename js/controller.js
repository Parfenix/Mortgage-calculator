import * as Model from "./model.js";
import updateResultsView from "./view/updateResultsView.js";
import programs from "./view/radioPrograms.js";
import { updateMinPercents } from "./view/utils.js";

import costInput from "./view/costInput.js";
import costRange from "./view/costRange.js";

import paymentInput from "./view/paymentInput.js";
import paymentRange from "./view/paymentRange.js";

import timeInput from "./view/timeInput.js";
import timeRange from "./view/timeRange.js";


window.onload = function () {
    const getData = Model.getData;
    
    // Init programs
    programs(getData);

    // Init cost input 
    const cleveCost = costInput(getData);
    // Init cost range
    const sliderCost = costRange(getData);

    // Init payment input
    const clevePayment = paymentInput(getData);
    // Init payment range
    const sliderPayment = paymentRange(getData);


    // Init time input
    const cleveTime = timeInput(getData);
    // Init time range
    const sliderTime = timeRange(getData);

    Model.setData({});
    const results = Model.getResults();
    updateResultsView(results);


    document.addEventListener('updateForm', (e) => {
        Model.setData(e.detail);

        const data = Model.getData();
        const results = Model.getResults();

        // Update all form view based on model
        updateFormAndSliders(data);

        // Update results block
        updateResultsView(results);
    });

    function updateFormAndSliders(data) {

        // update radio btns
        if (data.onUpdate === 'radioProgram') {
            updateMinPercents(data);

            // update slider
            sliderPayment.noUiSlider.updateOptions({
                range: {
                    min: data.minPaymentPercents * 100,
                    max: data.maxPaymentPercents * 100,
                },
            }); 
        }

        // cost input
        if (data.onUpdate !== 'inputCost') {
            cleveCost.setRawValue(data.cost);
        }

        // cost slider
        if (data.onUpdate !== 'costSlider') {
            sliderCost.noUiSlider.set(data.cost);
        }  

        // payment input
        if (data.onUpdate !== 'inputPayment') {
            clevePayment.setRawValue(data.payment); 
        }

        // payment slider
        if (data.onUpdate !== 'paymentSlider') {
            sliderPayment.noUiSlider.set(data.paymentPercents * 100); 
        } 

        // time input
        if (data.onUpdate !== 'inputTime') {
            cleveTime.setRawValue(data.time); 
        }

        // time slider
        if (data.onUpdate !== 'timeSlider') {
            sliderTime.noUiSlider.set(data.time)
        }
    }

    // order form
    const openFormBtn = document.querySelector('#openFormBtn');
    const orderForm = document.querySelector('#orderForm');
    const submitFormBtn = document.querySelector('#submitFormBtn');

    openFormBtn.addEventListener('click', function() {
        orderForm.classList.remove('none');
        openFormBtn.classList.add('none');
    })

    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // collect data from form
        const formData = new FormData(orderForm);
        console.log(formData);
        console.log(formData.get('name'));
        console.log(formData.get('email'));
        console.log(formData.get('phone'));

        // disable for btn and inputs
        submitFormBtn.setAttribute('disabled', true);
        submitFormBtn.innerText = 'Заявка отправляется...';

        orderForm.querySelectorAll ('input').forEach(function(input) {
            input.setAttribute('disabled', true);
        });

        fetchData();

        async function fetchData() {
            const data = Model.getData();
            const results = Model.getResults();

            let url = checkOnUrl(document.location.href);

            function checkOnUrl(url) {
                let urlArrayDot = url.split('.');

                if (url[url.length - 1] === 'html') {
                    urlArrayDot.pop();
                    let newUlr = urlArrayDot.join('.');
                    let urlArraySlash = newUrl.split('/');
                    urlArraySlash.pop();
                    newUlr = urlArraySlash.join('/') + '/';

                    return newUlr;
                }

                return url;
            }

            const response = await fetch(url + 'mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applicaton/json;charset=utf-8',
                },
                body: JSON.stringify({
                    form: {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'), 
                    },
                    data,
                    results,
                })
            });

            const result = await response.text();
            console.log(result);

            submitFormBtn.removeAttribute('disabled', true);
            submitFormBtn.innerText = 'Оформить заявку';

            orderForm.querySelectorAll ('input').forEach(function(input) {
                input.removeAttribute('disabled', true);
            });

            // clean form fields
            orderForm.reset();
            orderForm.classList.add('none');

            // receive an answer
            if (result === 'SUCCESS') {
                document.getElementById('success').classList.remove('none');
            } else {
                document.getElementById('error').classList.remove('none');
            }
        }
    })

}