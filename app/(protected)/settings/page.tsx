"use client"

import { logout } from "@/actions/logout"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { useCurrentUser } from "@/hooks/use-current-user"



const SettingsPage = () => {

    const user = useCurrentUser();

    const onClick = () => {
      logout();
    };

  return (
    <Card className="w-[600px]">
    <CardHeader>
      <p className="text-2xl font-semibold text-center">
        ⚙️ Settings
      </p>
    </CardHeader>
        
        <form>
          <Button onClick={onClick} type="submit">
            Sign Out
          </Button>
        </form>
    </Card>
  )
}

export default SettingsPage