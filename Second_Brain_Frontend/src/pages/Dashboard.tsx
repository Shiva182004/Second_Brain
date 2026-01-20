import { useState } from "react";
import { Sidebar } from "../components/ui/Sidebar";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { Button } from "../components/ui/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { useContent } from "../hooks/useContent";
import { Card } from "../components/ui/Card";
import axios from "axios";
import { BACKEND_URL } from "../config";
function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();

  async function shareBrain() {
    const response = await axios.post(
      `${BACKEND_URL}/brain/share`,
      {},
      { withCredentials: true }
    );

    const shareLink = response.data.link;

    // copy to clipboard
    await navigator.clipboard.writeText(shareLink);

    alert("Share link copied to clipboard!");
  }

  return (
    <>
      <div>
        <Sidebar />
        <div className="p-4 ml-72 min-h-screen bg-gray-100">
          <CreateContentModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
          />
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon size="lg" />}
              size="md"
            ></Button>
            <Button
              variant="secondary"
              text="Share Brain"
              startIcon={<PlusIcon size="lg" />}
              size="md"
              onClick={shareBrain}
            ></Button>
          </div>
          <div className="flex gap-4">
            {contents.map(({ id, type, link, title }) => {
  return (
    <Card
      id={id}
      key={link}
      type={type}
      link={link}
      title={title}
    />
  );
})}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
