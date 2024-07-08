import { Link } from "react-router-dom";
import useUser from "@/hooks/user";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import {
  ArrowRight,
  NavArrowLeft,
  NavArrowRight,
  User as UserIcon,
} from "iconoir-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ProfileCompletionStatus = () => {
  const { user, profileCompletionStatus } = useUser();
  const [activeStep, setActiveStep] = useState(0);

  if (!profileCompletionStatus) return null;

  const { personal_profile, education, membership_application } =
    profileCompletionStatus;

  const steps = [
    {
      title: "Add your personal information",
      link: "/profile",
      completed: personal_profile,
    },
    {
      title: "Add your education at NIT Arunachal Pradesh",
      link: "/profile/education",
      modalState: "education",
      completed: education,
    },
    {
      title: "Fill the Alumni Membership form",
      link: "/alumni-membership",
      completed: membership_application,
    },
    {
      title: "Add a profile picture",
      link: "/profile",
      modalState: "avatar",
      completed: !!user?.avatar,
    },
    {
      title: "Add your work experience",
      link: "/profile/experience",
      modalState: "experience",
      completed: false,
    },
  ];
  const remainingSteps = steps.filter((step) => !step.completed);

  return (
    !steps.every((step) => step.completed) && (
      <Card className="mb-4 first:*:pt-0 overflow-hidden">
        <div className="flex gap-0.5 h-2 pt-0">
          {Array.from({
            length: steps.length,
          }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 ${
                i < steps.filter(({ completed }) => completed).length
                  ? "bg-primary/80"
                  : "bg-gray-300/80"
              }`}
            />
          ))}
        </div>
        <CardHeader>
          <div className="flex flex-row gap-8 justify-between items-center flex-wrap">
            <CardTitle className="flex gap-4 items-center">
              <UserIcon
                width={24}
                height={24}
                strokeWidth={1.8}
                className="flex-shrink-0"
              />
              {!membership_application
                ? "Your profile is missing key information that is required to apply for Alumni Membership."
                : "Add more information to your profile to make it more informative."}
            </CardTitle>
            <div className="text-sm font-medium text-muted-foreground ml-auto">
              {remainingSteps.length} steps to complete
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-between items-center">
          <Link
            className={cn(
              buttonVariants({
                variant: "link",
                className: `p-0 font-medium ${
                  remainingSteps[activeStep].completed
                    ? "text-primary"
                    : "text-foreground"
                }`,
                size: "default",
              })
            )}
            state={{ modal: remainingSteps[activeStep].modalState }}
            to={remainingSteps[activeStep].link}
          >
            {remainingSteps[activeStep].title}
            <ArrowRight width={14} height={14} />
          </Link>
          {remainingSteps.length > 1 && (
            <div className="flex gap-4 items-center">
              <Button
                disabled={activeStep === 0}
                className="p-0 select-none hover:no-underline text-gray-500 hover:text-black"
                variant="link"
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              >
                <NavArrowLeft width={18} height={18} />
                Previous
              </Button>
              <Button
                disabled={activeStep === remainingSteps.length - 1}
                className="p-0 select-none hover:no-underline text-gray-500 hover:text-black"
                variant="link"
                onClick={() =>
                  setActiveStep((prev) =>
                    Math.min(remainingSteps.length - 1, prev + 1)
                  )
                }
              >
                Next
                <NavArrowRight width={18} height={18} />
              </Button>
            </div>
          )}
        </CardContent>
        {/* <CardContent>
          <ul>
            {steps
              .filter((step) => !step.completed)
              .map(({ title, completed, modalState, link }, i) => (
                <li key={i}>
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: "link",
                        className: `p-0 ${
                          completed ? "text-primary" : "text-foreground"
                        }`,
                        size: "default",
                      })
                    )}
                    state={{ modal: modalState }}
                    to={link}
                  >
                    {title}
                    <ArrowRight width={16} height={16} />
                  </Link>
                </li>
              ))}
          </ul>
        </CardContent> */}
      </Card>
    )
  );
};

export default ProfileCompletionStatus;
