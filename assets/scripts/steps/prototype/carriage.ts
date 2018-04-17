export const parts_information:Object = {
    "dseat":{
        "variations": {
            "1": {
                "cost": 1,
                "time_to_build": 1,
                "speed": 0,
                "aesthetics": 1,
                "ergonomy": 1,
                "size": 0,
                "robustness": 0,
            },
            "2": {
                "cost": 2,
                "time_to_build": 2,
                "speed": 0,
                "aesthetics": 2,
                "ergonomy": 2,
                "size": 0,
                "robustness": 0,
            },
            "3": {
                "cost": 3,
                "time_to_build": 3,
                "speed": 0,
                "aesthetics": 3,
                "ergonomy": 3,
                "size": 0,
                "robustness": 0,
            },
        },
    },
    "pattern":{
        "variations": {
            "1": {
                "cost": 2,
                "time_to_build": 3,
                "speed": 0,
                "aesthetics": 1,
                "ergonomy": 0,
                "size": 0,
                "robustness": 3,
            },
            "2": {
                "cost": 1,
                "time_to_build": 2,
                "speed": 0,
                "aesthetics": 2,
                "ergonomy": 0,
                "size": 0,
                "robustness": 2,
            },
            "3": {
                "cost": 3,
                "time_to_build": 3,
                "speed": 0,
                "aesthetics": 3,
                "ergonomy": 0,
                "size": 0,
                "robustness": 1,
            },
        },
    },
    "wheels":{
        "variations": {
            "1": {
                "cost": 1,
                "time_to_build": 1,
                "speed": 1,
                "aesthetics": 0,
                "ergonomy": 0,
                "size": 1,
                "robustness": 3,
            },
            "2": {
                "cost": 2,
                "time_to_build": 2,
                "speed": 2,
                "aesthetics": 0,
                "ergonomy": 0,
                "size": 2,
                "robustness": 2,
            },
            "3": {
                "cost": 3,
                "time_to_build": 3,
                "speed": 3,
                "aesthetics": 0,
                "ergonomy": 0,
                "size": 3,
                "robustness": 1,
            },
        },
    },
    "seat":{
        "variations": {
            "1": {
                "cost": 1,
                "time_to_build": 0,
                "speed": 0,
                "aesthetics": 1,
                "ergonomy": 1,
                "size": 0,
                "robustness": 0,
            },
            "2": {
                "cost": 2,
                "time_to_build": 2,
                "speed": 0,
                "aesthetics": 2,
                "ergonomy": 2,
                "size": 0,
                "robustness": 0,
            },
            "3": {
                "cost": 3,
                "time_to_build": 3,
                "speed": 0,
                "aesthetics": 3,
                "ergonomy": 3,
                "size": 0,
                "robustness": 0,
            },
        },
    },
    "boot":{
        "variations": {
            "1": {
                "cost": 1,
                "time_to_build": 1,
                "speed": 3,
                "aesthetics": 0,
                "ergonomy": 1,
                "size": 1,
                "robustness": 0,
            },
            "2": {
                "cost": 2,
                "time_to_build": 2,
                "speed": 2,
                "aesthetics": 0,
                "ergonomy": 2,
                "size": 2,
                "robustness": 0,
            },
            "3": {
                "cost": 3,
                "time_to_build": 3,
                "speed": 1,
                "aesthetics": 0,
                "ergonomy": 3,
                "size": 3,
                "robustness": 0,
            },
        },
    },
    "chassis":{
        "variations": {
            "1": {
                "cost": 1,
                "time_to_build": 2,
                "speed": 3,
                "aesthetics": 0,
                "ergonomy": 0,
                "size": 1,
                "robustness": 3,
            },
            "2": {
                "cost": 2,
                "time_to_build": 1,
                "speed": 2,
                "aesthetics": 0,
                "ergonomy": 0,
                "size": 2,
                "robustness": 2,
            },
            "3": {
                "cost": 3,
                "time_to_build": 2,
                "speed": 1,
                "aesthetics": 0,
                "ergonomy": 0,
                "size": 3,
                "robustness": 3,
            },
        },
    },
};

export const carriage_indicators:Object = {
    "speed": [
        "wheels",
        "chassis",
        "boot",
    ],
    "aesthetics": [
        "seat",
        "dseat",
        "pattern",
    ],
    "ergonomy": [
        "boot",
        "seat",
        "pattern",
    ],
    "size": [
        "wheels",
        "chassis",
        "boot",
    ],
    "robustness": [
        "wheels",
        "chassis",
        "pattern",
    ],
    "cost": [
        "wheels",
        "chassis",
        "boot",
        "seat",
        "dseat",
        "pattern",
    ],
    "time_to_build": [
        "wheels",
        "chassis",
        "boot",
        "seat",
        "dseat",
        "pattern",
    ],
}

export const carriage_next_step:Object = {
    "speed": {
        "min": 4,
        "max": null,
        "min_warning": "stage4_min_speed",
        "max_warning": null,
    },
    "aesthetics": {
        "min": 5,
        "max": null,
        "min_warning": "stage4_min_aesthetics",
        "max_warning": null,
    },
    "ergonomy": {
        "min": 4,
        "max": null,
        "min_warning": "stage4_min_ergonomy",
        "max_warning": null,
    },
    "size": {
        "min": 4,
        "max": null,
        "min_warning": null,
        "max_warning": null,
    },
    "robustness": {
        "min": 4,
        "max": null,
        "min_warning": "stage4_min_robustness",
        "max_warning": null,
    },
    "cost": {
        "min": 7,
        "max": 16,
        "min_warning": "stage4_min_cost",
        "max_warning": "stage4_max_cost",
    },
    "time_to_build": {
        "min": 8,
        "max": 17,
        "min_warning": "stage4_min_time_to_build",
        "max_warning": "stage4_max_time_to_build",
    },
}

export function calculate_indicator(carriage_data, indicator) {
    var result = 0;
    
    for(var item of carriage_indicators[indicator]) {
        var selected_part = carriage_data["parts"][item]["part"];

        if(selected_part === "none")
            continue;
        
        var variation = selected_part[selected_part.length - 1];

        result += parts_information[item]["variations"][variation][indicator];
    }
    
    return result;
}