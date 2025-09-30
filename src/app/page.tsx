import Image from "next/image";
export default function App() {
  return (
    <>
      <main className="min-h-screen bg-landing">
        {/* Hero section */}
        <div className="hero min-h-screen">
          <div className="hero-content flex justify-between">
            <div className="text-center lg:text-left mt-[425px]">
              <h1 className="text-5xl font-bold">About</h1>
              <p className="py-6">
                WorkFlow Manager is a task management system that makes work
                clear and efficient. Managers can assign tasks and view
                employees, while employees can access departmental tasks, accept
                them, or work on assigned ones — all with real-time tracking and
                improved collaboration.
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <div className="bg-gray-200 p-8">
                  <h1 className="tracking-[0.4em] text-4xl font-bold mb-[1rem]">
                    TASKS
                  </h1>
                  <h2 className="tracking-[0.4em] text-2xl font-bold mt-[-1.5rem]">
                    FLOW
                  </h2>

                  <div>
                    Task management that flows smoothly, clearly, and
                    collaboratively.
                  </div>

                  <div className="mt-[2rem] w-full">
                    <div className="flex justify-center">
                      <button className="btn bg-black text-white rounded-[50px] w-2/3 p-6 hover:bg-secondary">
                        Login
                      </button>
                    </div>
                  </div>
                </div>

                <Image
                  src="/qr.jpg"
                  width={274.29 / 2}
                  height={66 / 2}
                  alt=""
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
