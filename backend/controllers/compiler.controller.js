import { io } from '../socket/socket.js';

export const runCode = async (req, res) => {
  try {
    const { sourceCode, language, version, inputs } = req.body;
    const { id: audioRoomId } = req.params;
    const senderId = req.user._id;

    //
    //

    const response = await fetch(`https://emkc.org/api/v2/piston/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language,
        version,
        files: [
          {
            content: sourceCode,
          },
        ],
        stdin: inputs,
      }),
    });

    if (!response.ok) {
      res.status(400).json({ error: 'Failed to execute code' });
    }

    const data = await response.json();
    res.status(201).json({ data });

    //
    //
  } catch (error) {
    console.log('Error in runCode controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
