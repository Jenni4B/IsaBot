I keep getting an error when I try to send a message to Playlab. It says that the input is required, but I thought I was providing it.


The console when I click the button:

    [Sending message to Playlab] {
      input: {
        message: 'I missed my session again — things are chaotic.\n' +
          'Still behind but trying to get back into it.'
      }
    }


The JSON response I recieve:

    [Playlab] Response: {
      "error": {
        "issues": [
          {
            "code": "invalid_type",
            "expected": "string",
            "received": "undefined",
            "path": [
              "input",
              "First User Input"
            ],
            "message": "Required"
          }
        ],
        "name": "ZodError"
      }
    }

I'm reaching playlab but playlab is not reaching me. 
My code is expecting a string but recieves undefined and I'm not sure what to insert, delete, or how to pick out what is required.