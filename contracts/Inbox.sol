pragma solidity >= 0.4.17;

contract Inbox {
    string public message;
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
    function doMath(int a, int b) {
        a + b;
        b - a;
        a * b;
        a == 0;
    }
    
}