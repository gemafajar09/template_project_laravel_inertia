import { Spin, Progress } from "antd"

export default function ProgressBar({percent, loding}){
  return (
      <>
        {
            loding ? 
                <div className="absolute inset-0 z-50 flex items-center justify-center h-screen bg-gray-100 opacity-70">
                    <div className="text-center">
                        <div className="mb-4">
                        <Progress
                            type="circle"
                            percent={percent}
                            strokeWidth={8}
                            size={80}
                            className="mx-auto"
                        />
                        </div>
                        <Spin size="large" tip="Loading..." className="mt-4 text-blue-500" />
                    </div>
                </div>
            
            : <></>
        }
    </> 
  );
};
