import SidePanelSection from "./SidePanelSection";
import styles from './SidePanelSection';

function DashboardSidePanel()
{
    return (<div>
            <div>
            <a href='/'><img src={'/Group1.png'}/>
            </a>
        </div>
        <div>
            <p>MENU</p>
        </div>
        <SidePanelSection name="Products"/>
        <SidePanelSection name="Orders"/>
    </div>);
}

export default DashboardSidePanel;