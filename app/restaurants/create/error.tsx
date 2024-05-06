"use client";

export default function Error(props) {
  return <pre>Ups! Hubo un error {JSON.stringify(props)}</pre>;
}
