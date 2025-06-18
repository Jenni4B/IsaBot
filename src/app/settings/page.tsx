import Theme from "../components/settings/theme";
import UserInformation from "../components/settings/userInformation";


const settings = () => {
  return (
    <div>
      {/* Settings Page Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="space-y-8">
          <UserInformation />
          <Theme />
        </div>
      </div>
    </div>
  );
}

export default settings;