import Avatar from "@/components/custom-ui/Avatar/Avatar";
import Modal from "@/components/custom-ui/Modal/Modal";
import SchemaForm from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useUser from "@/hooks/user";
import { useState } from "react";

const CreatePost: React.FC = () => {
  const { user } = useUser();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex flex-row gap-4">
            <Avatar avatar={user?.avatar} size="3rem" />
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="bg-slate-100 px-4 grow text-left rounded-full border border-solid border-muted-foreground/30"
            >
              Start a post...
            </button>
          </div>
        </CardContent>
      </Card>
      <Modal
        modalTitle="Create a post"
        isOpen={isPostModalOpen}
        setIsOpen={setIsPostModalOpen}
      >
        <div className="p-4 bg-card">
          <p className="text-sm text-muted-foreground">
            Share your thoughts with the community
          </p>
          <SchemaForm
            schema={[
              {
                name: "post_type",
                type: "radio",
                required: "Post type is required",
                label: "Create a new...",
                options: [
                  { label: "Post", value: "post", defaultChecked: true },
                  { label: "Event", value: "event" },
                ],
              },
              {
                name: "description",
                type: "textarea",
                required: "Description is required",
                label: "Write your post",
              },
              {
                name: "pictures",
                type: "file",
                multiple: true,
                allowedFormats: ["image/png", "image/jpeg", "image/webp"],
                label: "Photos",
              },
            ]}
            onSubmit={(data) => {
              console.log(data);
            }}
            loading={false}
            actions={
              <div className="flex gap-4">
                <Button
                  onClick={() => setIsPostModalOpen(false)}
                  className="grow"
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button className="grow" type="submit" variant="default">
                  Post
                </Button>
              </div>
            }
          />
        </div>
      </Modal>
    </>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div>
      <CreatePost />
    </div>
  );
};

export default Dashboard;
