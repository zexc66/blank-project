export default function VerifyPage() {
  return (
    <div className="container max-w-xl py-12">
      <h1 className="text-2xl font-semibold">Verify your email</h1>
      <p className="mt-2 text-neutral-700">
        We sent a verification link to your email. Please click the link to activate your account.
      </p>
      <div className="mt-6">
        <a href="/login" className="rounded bg-primary-blue px-3 py-2 text-white">
          Back to Login
        </a>
      </div>
    </div>
  )
}