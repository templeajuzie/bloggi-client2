'use client';

import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import { CancelOutlined } from "@mui/icons-material";
import { IoMdSend } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import Tooltip from "@mui/material/Tooltip";
import { HiOutlineDotsVertical } from "react-icons/hi";

const PostChat = ({
  size,
  handleOpen,
  blog,
  PostComment,
  usercomment,
  setUserComment,
  allComments,
}) => {
  return (
    <div className="h-full md:h-[80%]">
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
        className="fixed flex flex-col h-full md:h-[85%]"
      >
        <DialogHeader className="h-[10%]">
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl">
              Post Comment
            </p>
            <Tooltip title="Close" placement="top" arrow>
              <LiaTimesSolid
                onClick={() => handleOpen(null)}
                className="cursor-pointer"
              />
            </Tooltip>
          </div>
        </DialogHeader>
        <DialogBody className="py-1 rounded-sm shadow-sm h-[80vh] md:h-[60vh] lg:h-[70vh] xl:h-[60vh] overflow-y-scroll">
          <div className="flex flex-col gap-4">
            {allComments.map((item) => (
              <article
                className="p-2 px-2 text-base bg-white border-b rounded-lg md:px-4"
                key={item.id}
              >
                <footer className="flex items-center justify-between w-full mb-2 ">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900 dark:text-white">
                      <Image
                        className="w-6 h-6 mr-2 rounded-full"
                        src={item.userid.userdp}
                        alt="Michael Gough"
                        width={24}
                        height={24}
                      />
                      {item.userid.fullname}
                    </div>
                    <p className="mr-5 text-sm text-gray-600 dark:text-gray-400">
                      {item.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <button
                    id="dropdownComment1Button"
                    data-dropdown-toggle="dropdownComment1"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>
                  <div
                    id="dropdownComment1"
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-36 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconHorizontalButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Remove
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Report
                        </a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.usercomment}
                </p>
              </article>
            ))}
          </div>
        </DialogBody>
        <DialogFooter className="flex flex-col items-center justify-center h-[10vh] md:h-auto">
          <div className="flex flex-row items-center justify-between w-full gap-4">
            <div className="flex flex-row items-center w-full gap-5">
              <div className="flex flex-row items-center w-full gap-5 px-1 py-1 bg-gray-200 rounded-full cursor-pointer">
                <div className="hidden w-auto p-1 bg-white rounded-full h-fit md:block">
                  <Image
                    src={blog.author.userdp}
                    className="object-cover w-8 h-8 rounded-full cursor-pointer"
                    height={30}
                    width={30}
                    alt="user"
                    
                  />
                </div>
                <div className="w-[90%]">
                  <textarea
                    id="comment"
                    rows="1"
                    className="w-full h-5 px-2 text-sm text-gray-900 bg-transparent border-0 resize-none focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400"
                    value={usercomment}
                    placeholder="Write a comment..."
                    onChange={(e) => setUserComment(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <Button
              variant="gradient"
              style={{ background: "#FF3131" }}
              className="bg-[#FF3131]"
              onClick={() => {
                PostComment();
              }}
            >
              <IoMdSend className="text-xl text-white" />
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default PostChat;
