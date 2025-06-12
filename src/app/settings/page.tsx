import Notifications from "../components/settings/notifications";
import Theme from "../components/settings/theme";
import UserInformation from "../components/settings/userInformation";


const settings = () => {
  return (
    <div>
      {/* Settings Page Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
        <div>
          <Notifications />
        </div>
        <div>
          <UserInformation />
        </div>
        <div>
          <Theme />
        </div>
      </div>
    </div>
  );
}

export default settings;