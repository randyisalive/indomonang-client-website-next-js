import React from "react";

const ReplyComponents = ({ ticket = [], handleDownload = () => {} }) => {
  return (
    <>
      {ticket.chats_data && (
        <div className="flex flex-col gap-3">
          {ticket.chats_data?.map((item) => {
            return (
              <div key={item.id} className="flex gap-3 w-full">
                <div className="w-1/6 text-center ">
                  <div className=" flex flex-col justify-center items-center gap-3">
                    <img
                      src={`data:image/jpg;base64,${item.image?.content}`}
                      className=" rounded-full border"
                      width={55}
                      alt="asda.jpg"
                    />
                    <span className="w-fit">{item.name}</span>
                  </div>
                </div>
                <div className="bg-white w-5/6 flex gap-3 border rounded-xl relative p-3  shadow-lg">
                  <div className=" text-lg flex flex-col gap-3 p-2 w-full">
                    <div className="bg-white text-sm w-full ">
                      <p>{item.text}</p>
                    </div>
                    {item.attachment && (
                      <div className="flex gap-3 items-center text-xs">
                        <div
                          onClick={() =>
                            handleDownload(
                              item.attachment?.content,
                              item.attachment?.filename
                            )
                          }
                          className=" text-blue-500 flex items-center gap-2 cursor-pointer"
                        >
                          <i className="pi pi-folder"></i>
                          <p className="  hover:underline ">
                            {item.attachment?.filename}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ReplyComponents;
