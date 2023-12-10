use ws::{listen, Message};
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let mut port: &str = "8081";
    if args.len() > 1 && &args[1] != "" {
        port = &args[1];
    }
    let url: String = format!("127.0.0.1:{}", port);
    println!("WebSocket server started at: ws://{}", url);
    if let Err(error) = listen(&url, |out| {
        move |msg: Message| {
            if !&msg.to_string().starts_with("data:image") {
                println!("Received Message: {}", msg);
            }
            out.broadcast(msg)
        }
    }) {
        // Error
        println!("Failed to create WebSocket due to:  {:?}", error);
    }
}