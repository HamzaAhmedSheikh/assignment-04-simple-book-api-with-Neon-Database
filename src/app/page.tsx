import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto container text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-indigo-500 md:text-5xl lg:text-6xl">
          Simple Books API using Next.js 13 and Neon
        </h1>
        <p className="mb-8 text-2xl font-medium text-indigo-500 lg:text-xl sm:px-16 xl:px-48">
          GET, POST, PATCH, DELETE
        </p>

        <div className="block container p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-500">
            Book API
          </h5>

          <p className="mt-4">
            <code className="font-medium text-lg tracking-tight">
              /api-clients ---- (POST request, create clients, and name and email
              as body)
            </code>
          </p>
          <p className="mt-2">
            <code className="font-medium text-lg tracking-tight">
              /books ---- (GET request, get all books)
            </code>
          </p>

          <p className="mt-2">
            <code className="font-medium text-lg tracking-tight">
            /orders/:id ---- (GET and PATCH and DELETE requests, get and update and delete order, <br /> for update customerName as body and id as params for all requests)
            </code>
          </p>

          <p className="mt-2">
            <code className="font-medium text-lg tracking-tight">
            /status ------ (to check API status)
            </code>
          </p>
         
        </div>
      </div>
    </section>
  );
};

export default Home;
