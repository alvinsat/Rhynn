// Network layer for webclient, replicated from client network logic

export class Network {
    constructor() {
        this.connected = false;
        this.serverUrl = 'http://localhost:3001'; // Assume server has HTTP API
        this.polling = false;
    }

    connect(serverUrl = this.serverUrl) {
        this.serverUrl = serverUrl;
        this.connected = false;
        if (this.serverUrl === 'http://localhost:3001') {
            console.log('Network polling is disabled: no real server configured.');
            this.polling = false;
            return;
        }
        this.polling = true;
        console.log('Attempting to connect to server via HTTP at', this.serverUrl);
        this.pollUpdates();
    }

    send(data) {
        if (!this.connected) {
            return;
        }

        fetch(this.serverUrl + '/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(() => {
            this.connected = false;
        });
    }

    pollUpdates() {
        if (!this.polling) {
            return;
        }

        fetch(this.serverUrl + '/updates')
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP ' + response.status);
                }
                this.connected = true;
                return response.json();
            })
            .then(data => this.handleMessage(data))
            .catch(err => {
                if (this.connected) {
                    console.warn('Server disconnected:', err.message);
                }
                this.connected = false;
            })
            .finally(() => setTimeout(() => this.pollUpdates(), 1000));
    }

    handleMessage(data) {
        // Parse and handle server messages
        console.log('Received:', data);
        // TODO: Update game state based on messages, e.g., other players, items
        if (data.type === 'move') {
            // Update positions
        }
    }

    // Implement login, movement, etc.
    login(username, password) {
        this.send({ type: 'login', username, password });
    }

    move(x, y) {
        this.send({ type: 'move', x, y });
    }
}