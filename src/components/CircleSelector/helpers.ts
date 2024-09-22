interface IReturn {
  direction: "forward" | "back";
  angle: number;
}

export const getRotationParams = (newIdx: number, oldIdx: number, totalCount: number): IReturn => {

  const newBeforeCurrent = newIdx > oldIdx
  const forwardSteps = newBeforeCurrent ? newIdx - oldIdx : (totalCount - oldIdx) + newIdx
  const backSteps = newBeforeCurrent ? oldIdx + (totalCount - newIdx) : oldIdx - newIdx

  const direction = forwardSteps <= backSteps ? "forward" : "back"

  const changeSteps = direction === "forward" ? forwardSteps : backSteps

  const itemAngle = ((360 / totalCount) * Math.abs(changeSteps))

  return {
    direction: direction,
    angle: itemAngle
  }
}