import ColorPicker from "@/utils/ui/ColorPicker";
import Dropdown from 'react-bootstrap/Dropdown';

export default function DropdownColorPicker({
  disabled = false,
  stopCloseOnClickSelf = true,
  color,
  onChange,
  ...rest
}) {
  return (
    <>
    <Dropdown>
      <Dropdown.Toggle variant="link" id="dropdown-basic">
      <i className="icon bi bi-palette"></i>
        <span>A</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className="color-picker-menu">
        <ColorPicker color={color} onChange={onChange} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>



    </>
  )
}
