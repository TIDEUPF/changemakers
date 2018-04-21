export const parts_information:Object = {
    "pseat":{
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
                "robustness": 1,
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
        "pseat",
        "pattern",
    ],
    "ergonomy": [
        "boot",
        "seat",
        "pseat",
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
        "pseat",
        "pattern",
    ],
    "time_to_build": [
        "wheels",
        "chassis",
        "boot",
        "seat",
        "pseat",
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
        "min_warning": "stage4_min_size",
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

export function evaluate_indicator(carriage_data, indicator) {
    var indicator_value = calculate_indicator(carriage_data, indicator);
    var pass = true;
    var warning = "";

    if(carriage_next_step[indicator]["min"] !== null) {
        if(!(indicator_value >= carriage_next_step[indicator]["min"])) {
            pass = false;
            warning = carriage_next_step[indicator]["min_warning"];
            return {
                "pass": pass,
                "warning": warning,
                "failed_condition": "min",
                "indicator_value": indicator_value,
            };
        }
    }

    if(carriage_next_step[indicator]["max"] !== null) {
        if(!(indicator_value <= carriage_next_step[indicator]["max"])) {
            pass = false;
            warning = carriage_next_step[indicator]["max_warning"];
            return {
                "pass": pass,
                "warning": warning,
                "failed_condition": "max",
                "indicator_value": indicator_value,
            };
        }
    }

    return {
        "pass": pass,
        "warning": warning,
        "failed_condition": null,
        "indicator_value": indicator_value,
    };
}

export function check_carriage(carriage_data) {
    var indicators_result = {};
    var failed = [];
    var passed = [];

    for(var indicator in carriage_next_step) {
        var step_result = evaluate_indicator(carriage_data, indicator);

        if(step_result["pass"]) {
            passed.push(indicator);
        } else {
            failed.push(indicator);
        }

        indicators_result[indicator] = step_result;
    }

    return {
        "pass": (failed.length === 0),
        "passed": passed,
        "failed": failed,
        "indicators_result": indicators_result,
    }
}