use ws::listen;

fn main() {
    let url: &str = "127.0.0.1:8081";
    println!("WebSocket server started at: {}", url);
    if let Err(error) = listen(url, |out| {
        move |msg| {
            out.broadcast(msg)
        }
    }) {
        // Error
        println!("Failed to create WebSocket due to:  {:?}", error);
    }
}
