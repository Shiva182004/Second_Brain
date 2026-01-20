import { useRef, useState } from "react";
// import type { } from "react"
import { CrossIcon } from "../../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";

enum ContentType {
  Youtube = "youtube",
  Tweet = "tweet",
}

export function CreateContentModal({ open, onClose }) {
  const titileRef = useRef();
  const LinkRef = useRef();
  const tagRef = useRef();
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent () {
    const title = titileRef.current?.value;
    const link = LinkRef.current?.value;
    const tags = tagRef.current?.value;

    await axios.put(`${BACKEND_URL}/content`, {
        link,
        title,
        type,
        tags
    }, {
        withCredentials: true
    })

    alert("Content added");
  }

  

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>

          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 p-4 rounded">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input ref={titileRef} placeholder={"Title"} />
                  <Input ref={LinkRef} placeholder={"Link"} />
                  <Input ref={tagRef} placeholder={"Tag"} />
                </div>
                <div>
                  <h1>Type:</h1>
                  <div className="flex gap-2 p-4 justify-center">
                    <Button
                      text="Youtube"
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Youtube);
                      }}
                    ></Button>
                    <Button
                      text="Tweet"
                      variant={
                        type === ContentType.Tweet ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Tweet);
                      }}
                    ></Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button onClick={addContent} variant="primary" text="Submit" />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
