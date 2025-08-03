export default function OptionsEditor() {
  return (
    <div className="p-4 space-y-2">
      <label className="block">
        Velocidade:
        <select className="block w-full border p-1">
          <option>Lento</option>
          <option>Médio</option>
          <option>Rápido</option>
        </select>
      </label>
      <label className="block">
        Dificuldade:
        <select className="block w-full border p-1">
          <option>Fácil</option>
          <option>Médio</option>
          <option>Difícil</option>
        </select>
      </label>
    </div>
  );
}
