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
}