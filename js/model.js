let data = {
    selectedProgram: 0.1,
    programs: {
        base: 0.1,
        it: 0.047,
        gov: 0.067,
        zero: 0.12, 
    },
}

let results = {
    rate: data.selectedProgram,
}

function getData() {
    return {...data};
}

function getResults() {
    return {...results};
}

function setData(newData) {
    console.log('New data', newData);

    data = {
        ...data,
        ...newData,
    },

    results = {
        rate: data.selectedProgram,
    }

    console.log('Updated data', data);
    console.log(results)
}

export {getData, setData, getResults};