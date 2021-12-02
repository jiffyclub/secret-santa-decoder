function str_to_int(str) {
    // convert each character to its codepoint
    // convert that to hex
    // concatenate all the hex
    // convert to int
    let values = [];
    for (const char of str) {
        const ord = char.charCodeAt(0);
        const hex = ord.toString(16).padStart(2, '0');
        values.push(hex);
    }
    const hex_str = values.join('');
    const int_val = BigInt(`0x${hex_str}`);
    return int_val;
}


function* iter_by_two(str) {
    if (str.length % 2 !== 0) {
        str = `0${str}`;
    }
    for (let index = 0; index < str.length; index += 2) {
        yield `${str[index]}${str[index + 1]}`
    }
}


function int_to_str(int) {
    // convert to hex
    // iter values by two
    // convert to int
    // use String.fromCharCode on each int
    const hex_num = int.toString(16);
    let values = [];
    for (const hex of iter_by_two(hex_num)) {
        values.push(parseInt(hex, 16));
    }
    const str = String.fromCharCode(...values);
    return str;
}


function decode(key_value, name_value) {
    const key_num = str_to_int(key_value);
    const name_num = BigInt(`0x${name_value}`);
    const final_num = name_num / key_num;

    const name = int_to_str(final_num);
    return name;
}


async function type_text(str, element) {
    let output = '';
    for (const char of str) {
        output += char;
        element.innerText = output;
        await new Promise(r => setTimeout(r, 100));
    }
}


async function render_output(recipient) {
    await type_text(
        `Your Secret Santa recipient is: ${recipient}`,
        document.getElementById('santa-output')
    );
    await type_text('Keep it secret', document.getElementById('secret-output'));
    await type_text('Keep it safe', document.getElementById('safe-output'));
}


async function run_decode() {
    const key_value = document.getElementById('santa-key').value;
    const recipient_value = document.getElementById('santa-name').value;

    if (key_value.toLowerCase() === 'demo' && recipient_value.toLowerCase() === 'demo') {
        render_output('YOU');
    }
    else if (!!key_value && !!recipient_value) {
        const recipient = decode(key_value, recipient_value);
        render_output(recipient);
    }
}
