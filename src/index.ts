import * as readline from "readline";
import "dotenv/config";
import fs from "fs";
import { generateText } from "./utils";
import { terminal } from "terminal-kit";


class ConsoleApp {
  private conversations: any[] = [];
  private activeConversation: any | null | undefined = null;
  private historyFile = "history.json";

  constructor() {
    this.loadHistory();
    this.chooseConversation();
  }

  private async getInput(arg: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise<string>((resolve) => {
      rl.question(arg, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  private loadHistory = () => {
    try {
      const history = JSON.parse(fs.readFileSync(this.historyFile, "utf-8"));
      this.conversations = history.conversations;
      this.activeConversation = history.activeConversation
        ? this.conversations.find(
            (conversation) => conversation.name === history.activeConversation
          )
        : null;
    } catch (error) {
      console.error("Failed to load history", error);
    }
  };

  private saveHistory = () => {
    try {
      fs.writeFileSync(
        this.historyFile,
        JSON.stringify({
          conversations: this.conversations,
          activeConversation: this.activeConversation
            ? this.activeConversation.name
            : null,
        }),
        "utf-8"
      );
    } catch (error) {
      console.error("Failed to save history", error);
    }
  };

  private chooseConversation = async () => {
    console.clear();
    if (!this.conversations.length) {
      console.log("No conversations found, creating a new one...");
      this.activeConversation = {
        name: await this.getInput("Enter conversation name: "),
        messages: [],
      };
      this.conversations.push(this.activeConversation);
    } else if (!this.activeConversation) {
      console.log("No active conversation found, please select one:");
      this.conversations.forEach((conversation, index) => {
        console.log(`${index + 1}. ${conversation.name}`);
      });
      const selectedIndex = await this.getInput("Enter conversation number: ");
      const index = parseInt(selectedIndex, 10) - 1;
      if (index >= 0 && index < this.conversations.length) {
        this.activeConversation = this.conversations[index];
      } else {
        console.log("Invalid conversation number");
        this.chooseConversation();
        return;
      }
    }
    this.startChat();
  };

  private async startChat() {
    console.clear();
    terminal(`Active conversation: [${this.activeConversation!.name}]\n`);
    this.activeConversation?.messages.map((e: Message) => {
      const now = new Date(e.date);
      var dateString =
        now.getUTCHours() +
        ":" +
        ("0" + now.getUTCMinutes().toString()).slice(-2);

        terminal("\n[" + dateString + "] Me: " + e.input);
    });
    terminal.magenta("\nEnter: ");
    
    terminal.inputField((error, input) => {

      const message: Message = {
        sender: "user",
        input: input || "",
        date: new Date().toUTCString(),
      };
      
      if (input === "/convo" || "/cv" || "/convos" || "/conversations") {
        terminal.clear();
        terminal("\nPlease select a conversation:");

        // this.conversations.forEach((conversation, index) => {
        //   terminal(`\n${index + 1}. ${conversation.name}`);
        // });
        terminal(`\n${this.conversations.length + 1}. Create a new conversation`);
        terminal.singleColumnMenu(this.conversations, (res) => {

        });

      } else {
        terminal("\nSending...");



        if (message.input !== "") {
          this.activeConversation!.messages.push(message);
          this.saveHistory();
        }
        this.startChat();
      }
    });
    // const input = await this.getInput("> Enter: ");
    // if (input === "convo") {
    //   console.clear();
    //   console.log("Please select a conversation:");
    //   this.conversations.forEach((conversation, index) => {
    //     console.log(`${index + 1}. ${conversation.name}`);
    //   });
    //   console.log(
    //     `${this.conversations.length + 1}. Create a new conversation`
    //   );
    //   const selectedIndex = await this.getInput("Enter the number: ");
    //   const index = parseInt(selectedIndex, 10) - 1;
    //   if (index >= 0 && index < this.conversations.length) {
    //     this.activeConversation = this.conversations[index];
    //   } else if (index === this.conversations.length) {
    //     console.clear();
    //     const name = await this.getInput("Enter conversation name: ");
    //     this.activeConversation = { name, messages: [] };
    //     this.conversations.push(this.activeConversation);
    //   } else {
    //     console.log("Invalid conversation number");
    //   }
    //   this.startChat();
    // } else {
    //   const message: Message = {
    //     sender: "user",
    //     text: input,
    //     date: new Date().toUTCString(),
    //   };
    //   this.activeConversation!.messages.push(message);
    //   this.saveHistory();
    //   console.log(`You: ${input}`);
    //   // TODO: Interact with GPT-3 here and display the response
    //   const request: OpenAiRequest = {
    //     model: "text-davinci-002",
    //     prompt: "What is the meaning of life?",
    //     max_tokens: 100,
    //     temperature: 0.5,
    //   };
    //   const response = await generateText(request);
    //   console.log(response);
    //   this.startChat();
    // }
  }
}

new ConsoleApp();
