import { Breadcrumb } from "antd";

function App() {
  return (
    <>
      <Breadcrumb className="mx-4 my-4">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>

      <div className="bg-white p-6" style={{ minHeight: 360 }}>
        This is home page.
      </div>
    </>
  );
}

export default App;
