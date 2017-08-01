/**
 * Created by g6vc on 7/31/17.
 */

/**
 * Sends a Message
 * @param message Message object
 */
export function send(message, callback) {
    fetch('http://localhost:3000/send', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: message.user,
            text: message.text,
        })
    }).then((response) => response.json()).then((responseJson) => {
            return callback(responseJson);
        }).catch((error) => {
            console.error(error);
    });
}