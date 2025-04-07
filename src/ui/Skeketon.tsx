// Loading animation - common shimmer effect for all skeletons
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-slate-700/20 before:to-transparent";

// ---------------- CLIENTES SKELETONS ----------------

export function CardClienteSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-slate-800/30 p-4 border border-slate-700/50`}
    >
      <div className="flex flex-col space-y-3">
        {/* Cliente name */}
        <div className="h-6 w-3/4 rounded-md bg-slate-700/50" />

        {/* Contact info */}
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded-full bg-slate-700/50" />
          <div className="h-4 w-32 rounded-md bg-slate-700/50" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded-full bg-slate-700/50" />
          <div className="h-4 w-24 rounded-md bg-slate-700/50" />
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex justify-end space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-700/50" />
          <div className="h-8 w-8 rounded-full bg-slate-700/50" />
        </div>
      </div>
    </div>
  );
}

export function ClientesGridSkeleton() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <CardClienteSkeleton />
      <CardClienteSkeleton />
      <CardClienteSkeleton />
      <CardClienteSkeleton />
      <CardClienteSkeleton />
    </section>
  );
}

export function ListaClientesSkeleton() {
  return (
    <main>
      <section className="flex justify-between items-center mb-4">
        {/* SubHeading skeleton */}
        <div
          className={`${shimmer} relative h-8 w-48 overflow-hidden rounded-md bg-slate-700/50`}
        />

        {/* Button skeleton */}
        <div className="h-10 w-36 rounded-xl bg-slate-700/50" />
      </section>

      <ClientesGridSkeleton />
    </main>
  );
}

// ---------------- PRODUCTOS SKELETONS ----------------

export function CardProductoSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-slate-800/30 p-4 border border-slate-700/50`}
    >
      {/* Image placeholder */}
      <div className="h-40 w-full rounded-lg bg-slate-700/50 mb-3" />

      <div className="flex flex-col space-y-2">
        {/* Product name */}
        <div className="h-6 w-3/4 rounded-md bg-slate-700/50" />

        {/* Price */}
        <div className="h-5 w-20 rounded-md bg-slate-700/50" />

        {/* Stock status */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 rounded-md bg-slate-700/50" />
          <div className="h-4 w-16 rounded-md bg-slate-700/50" />
        </div>

        {/* Action buttons */}
        <div className="mt-3 flex justify-end space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-700/50" />
          <div className="h-8 w-8 rounded-full bg-slate-700/50" />
        </div>
      </div>
    </div>
  );
}

export function ProductosGridSkeleton() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <CardProductoSkeleton />
      <CardProductoSkeleton />
      <CardProductoSkeleton />
      <CardProductoSkeleton />
      <CardProductoSkeleton />
      <CardProductoSkeleton />
      <CardProductoSkeleton />
      <CardProductoSkeleton />
    </section>
  );
}

export function ListaProductosSkeleton() {
  return (
    <main>
      <section className="flex justify-between items-center mb-4">
        <div
          className={`${shimmer} relative h-8 w-48 overflow-hidden rounded-md bg-slate-700/50`}
        />
        <div className="h-10 w-36 rounded-xl bg-slate-700/50" />
      </section>

      <ProductosGridSkeleton />
    </main>
  );
}

// ---------------- FACTURAS SKELETONS ----------------

export function FacturaRowSkeleton() {
  return (
    <tr className={`${shimmer} relative border-b border-slate-700/30`}>
      <td className="py-4 px-4">
        <div className="h-5 w-24 rounded-md bg-slate-700/50" />
      </td>
      <td className="py-4 px-4">
        <div className="h-5 w-32 rounded-md bg-slate-700/50" />
      </td>
      <td className="py-4 px-4">
        <div className="h-5 w-20 rounded-md bg-slate-700/50" />
      </td>
      <td className="py-4 px-4">
        <div className="h-5 w-24 rounded-md bg-slate-700/50" />
      </td>
      <td className="py-4 px-4">
        <div className="h-6 w-20 rounded-full bg-slate-700/50" />
      </td>
      <td className="py-4 px-4">
        <div className="flex justify-end space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-700/50" />
          <div className="h-8 w-8 rounded-full bg-slate-700/50" />
        </div>
      </td>
    </tr>
  );
}

export function FacturaMobileSkeleton() {
  return (
    <div
      className={`${shimmer} relative mb-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50`}
    >
      <div className="flex justify-between mb-3">
        <div className="h-6 w-24 rounded-md bg-slate-700/50" />
        <div className="h-6 w-24 rounded-md bg-slate-700/50" />
      </div>
      <div className="flex justify-between mb-3">
        <div className="h-5 w-32 rounded-md bg-slate-700/50" />
        <div className="h-5 w-20 rounded-md bg-slate-700/50" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-6 w-20 rounded-full bg-slate-700/50" />
        <div className="flex space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-700/50" />
          <div className="h-8 w-8 rounded-full bg-slate-700/50" />
        </div>
      </div>
    </div>
  );
}

export function ListaFacturasSkeleton() {
  return (
    <main>
      <section className="flex justify-between items-center mb-4">
        <div
          className={`${shimmer} relative h-8 w-48 overflow-hidden rounded-md bg-slate-700/50`}
        />
        <div className="flex space-x-3">
          <div className="h-10 w-36 rounded-xl bg-slate-700/50" />
          <div className="h-10 w-28 rounded-xl bg-slate-700/50" />
        </div>
      </section>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-left">
              <th className="py-3 px-4">
                <div className="h-5 w-20 rounded-md bg-slate-700/50" />
              </th>
              <th className="py-3 px-4">
                <div className="h-5 w-20 rounded-md bg-slate-700/50" />
              </th>
              <th className="py-3 px-4">
                <div className="h-5 w-20 rounded-md bg-slate-700/50" />
              </th>
              <th className="py-3 px-4">
                <div className="h-5 w-20 rounded-md bg-slate-700/50" />
              </th>
              <th className="py-3 px-4">
                <div className="h-5 w-20 rounded-md bg-slate-700/50" />
              </th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            <FacturaRowSkeleton />
            <FacturaRowSkeleton />
            <FacturaRowSkeleton />
            <FacturaRowSkeleton />
            <FacturaRowSkeleton />
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden">
        <FacturaMobileSkeleton />
        <FacturaMobileSkeleton />
        <FacturaMobileSkeleton />
        <FacturaMobileSkeleton />
      </div>
    </main>
  );
}

// ---------------- DASHBOARD/INICIO SKELETONS ----------------

export function CardResumenSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-slate-800/30 p-4 border border-slate-700/50`}
    >
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-5 w-24 rounded-md bg-slate-700/50" />
          <div className="h-8 w-20 rounded-md bg-slate-700/50" />
        </div>
        <div className="h-12 w-12 rounded-full bg-slate-700/50" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-slate-800/30 p-4 border border-slate-700/50 h-64`}
    >
      <div className="h-6 w-36 rounded-md bg-slate-700/50 mb-4" />
      <div className="h-48 bg-slate-700/50 rounded-lg" />
    </div>
  );
}

export function TableRecentSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-slate-800/30 p-4 border border-slate-700/50`}
    >
      <div className="h-6 w-36 rounded-md bg-slate-700/50 mb-4" />
      <div className="space-y-3">
        <div className="flex justify-between p-2 border-b border-slate-700/30">
          <div className="h-5 w-32 rounded-md bg-slate-700/50" />
          <div className="h-5 w-16 rounded-md bg-slate-700/50" />
        </div>
        <div className="flex justify-between p-2 border-b border-slate-700/30">
          <div className="h-5 w-32 rounded-md bg-slate-700/50" />
          <div className="h-5 w-16 rounded-md bg-slate-700/50" />
        </div>
        <div className="flex justify-between p-2 border-b border-slate-700/30">
          <div className="h-5 w-32 rounded-md bg-slate-700/50" />
          <div className="h-5 w-16 rounded-md bg-slate-700/50" />
        </div>
        <div className="flex justify-between p-2 border-b border-slate-700/30">
          <div className="h-5 w-32 rounded-md bg-slate-700/50" />
          <div className="h-5 w-16 rounded-md bg-slate-700/50" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <main>
      <section className="mb-6">
        <div
          className={`${shimmer} relative h-10 w-64 overflow-hidden rounded-md bg-slate-700/50 mb-6`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardResumenSkeleton />
          <CardResumenSkeleton />
          <CardResumenSkeleton />
          <CardResumenSkeleton />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div>
          <TableRecentSkeleton />
        </div>
      </section>

      <section className="mt-6">
        <div
          className={`${shimmer} relative h-8 w-48 overflow-hidden rounded-md bg-slate-700/50 mb-4`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardResumenSkeleton />
          <CardResumenSkeleton />
          <CardResumenSkeleton />
          <CardResumenSkeleton />
        </div>
      </section>
    </main>
  );
}
