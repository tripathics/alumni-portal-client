import { NavLink } from "react-router-dom";
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

  if (!profileCompletionStatus) return null;

  const { personal_profile, education, membership_application } =
    profileCompletionStatus;

  const isProfileIncomplete =
    !membership_application && !user?.role.includes("alumni");

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: "Add your personal information",
      link: "/profile/#personal-details",
      completed: personal_profile,
    },
    {
      title: "Add your education at NIT Arunachal Pradesh",
      link: "/profile/education",
      completed: education,
    },
    {
      title: "Fill the Alumni Membership form",
      link: "/alumni-membership",
      completed: membership_application,
    },
  ];
  const incompleteSteps = steps.filter(({ completed }) => !completed);

  return (
    isProfileIncomplete && (
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
          <CardTitle className="flex gap-4 items-center">
            <UserIcon
              width={24}
              height={24}
              strokeWidth={1.8}
              className="flex-shrink-0"
            />
            Complete these steps in order to apply for Alumni Membership.
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between flex-wrap">
          {incompleteSteps[currentStep] && (
            <NavLink
              key={incompleteSteps[currentStep].title}
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "p-0",
                  size: "default",
                })
              )}
              to={incompleteSteps[currentStep].link}
            >
              {({ isActive }) => (
                <>
                  {incompleteSteps[currentStep].title}
                  {!isActive && <ArrowRight width={18} height={18} />}
                </>
              )}
            </NavLink>
          )}
          {incompleteSteps.length > 1 && (
            <div className="flex gap-4">
              <Button
                variant="link"
                className="hover:no-underline p-0 text-foreground"
                disabled={currentStep === 0}
                onClick={() => {
                  setCurrentStep((prev) => Math.max(prev - 1, 0));
                }}
              >
                <NavArrowLeft />
                Previous
              </Button>
              <Button
                variant="link"
                className="hover:no-underline p-0 text-foreground"
                disabled={currentStep === incompleteSteps.length - 1}
                onClick={() => {
                  setCurrentStep((prev) =>
                    Math.min(prev + 1, incompleteSteps.length - 1)
                  );
                }}
              >
                Next
                <NavArrowRight />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  );
};

export default ProfileCompletionStatus;
