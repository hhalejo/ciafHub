import { TrashIcon } from "@heroicons/react/24/solid";

export default function TestIcons() {
  return (
    <div>
      <p>Texto de prueba</p>
      <TrashIcon /> {/* debería renderizar un svg */}
    </div>
  );
}
