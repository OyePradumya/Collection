import java.io.*;
import java.net.*;

public class SocketClient {
  public static void main(String[] args) {
    try {
      Socket s = new Socket("localhost", 6666);
      DataOutputStream dout = new DataOutputStream(s.getOutputStream());
      dout.writeUTF("hello server i am sonu");
      dout.flush();
      dout.close();
      s.close();
    } catch (Exception e) {
      System.out.println(e);
    }
  }
}